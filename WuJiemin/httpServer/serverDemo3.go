package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

var mux map[string]func(w http.ResponseWriter, r *http.Request)

func main() {
	srv := &http.Server{
		Addr:        ":9090",
		Handler:     &myHandler{},
		ReadTimeout: 5 * time.Second,
	}
	mux = make(map[string]func(w http.ResponseWriter, r *http.Request))
	mux["/user"] = getUser
	mux["/user2"] = getUser

	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

type myHandler struct{}

// myHandler struct implement ServeHTTP
func (*myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler, ok := mux[string(r.URL.String())]; ok {
		handler(w, r)
		return
	}
	fmt.Fprintf(w, "hello, no handler")
}

// HandlerFunc for '/user' and '/user2'
// Response json of User struct
func getUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("origin:", r.Referer())
	// fmt.Println("pageSize:", r.FormValue("pageSize")) // Get query from request
	// fmt.Println("webTitle:", r.FormValue("webTitle")) // Get query from request
	fmt.Println("userAgent: " + r.UserAgent())
	fmt.Println("requestMothod: " + r.Method)

	type User struct {
		UserId   string `json:"userId"`
		UserName string `json:"userName"`
		Do       string `json:"do"`
	}
	user := User{UserId: "2", UserName: "Steve Jobs", Do: "Apple"}
	fmt.Println(user)
	fmt.Println("----------------------------------------------")
	userJson, err := json.Marshal(user)
	if err != nil {
		panic(err.Error())
	}

	w.Header().Set("Access-Control-Allow-Origin", "*") // cors

	w.Write(userJson) // Response's body
}

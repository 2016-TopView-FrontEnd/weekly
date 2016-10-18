package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	mySrvMux := &http.ServeMux{}
	mySrvMux.Handle("/user", http.HandlerFunc(getUser))
	mySrvMux.HandleFunc("/user2", getUser)
	// mySrvMux.HandleFunc("/user", getUser)
	err := http.ListenAndServe(":9090", mySrvMux) // It will use mySrvMux
	if err != nil {
		log.Fatal(err)
	}
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

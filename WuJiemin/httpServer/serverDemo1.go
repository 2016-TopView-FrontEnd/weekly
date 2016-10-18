package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/user", getUser)
	err := http.ListenAndServe(":9090", nil) // It will use defaultServerMux
	if err != nil {
		log.Fatal(err)
	}
}

// HandlerFunc for '/user'
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

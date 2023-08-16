package main

import (
	"fmt"
	"net/http"
	"os"
	"pancake/routes"
	"strconv"
)

func Start() {
	port := 3001

	http.HandleFunc("/test", routes.GetTest)

	fmt.Println("The server is on port " + strconv.Itoa(port))
	err := http.ListenAndServe(":"+strconv.Itoa(port), nil)
	if err != nil {
		fmt.Println("Server ERROR, exited.")
		os.Exit(1)
	}
}

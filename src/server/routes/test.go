package routes

import (
	"fmt"
	"io"
	"net/http"
)

func GetTest(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GET /test")
	io.WriteString(w, "Test API!!")
}

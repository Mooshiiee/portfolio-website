package main

import (
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// serve static content
	e.Static("/", "public")
	e.File("/", "public/index.html")
	e.File("/blog", "public/blog.html")

	// load html files
	/*
		indexBlob, err := os.ReadFile("public/index.html")
		if err != nil {
			e.Logger.Fatal("failed to load index.html: %s", err)
		}

		e.GET("/", func(c echo.Context) error {
			return c.HTMLBlob(http.StatusOK, indexBlob)
		})
	*/

	e.Logger.Fatal(e.Start(":1323"))
}

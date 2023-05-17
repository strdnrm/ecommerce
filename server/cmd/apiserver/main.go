package main

import (
	"ecommerce/pkg/apiserver"
	"ecommerce/pkg/config"
	"flag"

	"github.com/BurntSushi/toml"
)

var (
	configPath string
)

func init() {
	flag.StringVar(&configPath, "configpath", "configs/apiserver.toml", "path to config")
}

func main() {
	flag.Parse()

	config := config.NewConfig()
	_, err := toml.DecodeFile(configPath, config)
	if err != nil {
		panic(err)
	}

	if err := apiserver.Start(config); err != nil {
		panic(err)
	}

}

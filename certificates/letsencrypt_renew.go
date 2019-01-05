package main

import (
	"bytes"
	"fmt"
	"github.com/paulvollmer/go-concatenate"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
)

type Block struct {
	Try     func()
	Catch   func(Exception)
	Finally func()
}

type Exception interface{}

func Throw(up Exception) {
	panic(up)
}

func (tcf Block) Do() {
	if tcf.Finally != nil {

		defer tcf.Finally()
	}
	if tcf.Catch != nil {
		defer func() {
			if r := recover(); r != nil {
				tcf.Catch(r)
			}
		}()
	}
	tcf.Try()
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
func renew_certificate_for_domain(_domain string, retry_count int) {
	retry_count++
	_email := "bohdaq@gmail.com"
	_webroot := "/tmp/certbot/public_html"
	cmdName := "certbot"
	fmt.Println(_email, _webroot)
	cmdArgs := []string{"certonly", "--agree-tos", "--keep-until-expiring", "--email", _email, "--webroot", "-w", _webroot, "-d", _domain}
	Block{
		Try: func() {
			cmd := exec.Command(cmdName, cmdArgs...)
			var out bytes.Buffer
			var stderr bytes.Buffer
			cmd.Stdout = &out
			cmd.Stderr = &stderr
			err := cmd.Run()
			if err != nil {
				if retry_count < 5 {
					fmt.Println("Renewal error ", string(retry_count) + fmt.Sprint(err) + ": " + stderr.String())
					renew_certificate_for_domain(_domain, retry_count)
				} else {
					fmt.Println("Notable to renew certificate after 5 tries for domain " + _domain)
					Throw("Oh,...sh...")
				}
			}
			privkey := "/etc/letsencrypt/live/"+_domain+"/privkey.pem"
			cert := "/etc/letsencrypt/live/"+_domain+"/cert.pem"
			ssl := "/etc/letsencrypt/live/"+_domain+"/ssl.pem"
			mode := int(0755)
			data, err := concatenate.FilesToBytes("", privkey, cert)
			write := ioutil.WriteFile(ssl, data, os.FileMode(mode))
			check(write)
			fmt.Println(_domain)
			fmt.Println("Succesfully renewed certificate for " + _domain)
		},
		Catch: func(e Exception) {
			fmt.Printf("Caught %v\n", e)
		},
		Finally: func() {
			fmt.Println("Finally...")
		},
	}.Do()
}
func main() {
	cmd := exec.Command("id", "-u")
	output, err := cmd.Output()

	if err != nil {
		log.Fatal(err)
	}
	// 0 = root, 501 = non-root user
	i, err := strconv.Atoi(string(output[:len(output)-1]))
	if err != nil {
		log.Fatal(err)
	}

	if i == 0 {
		log.Println("Awesome! You are now running this program with root permissions!")
	} else {
		log.Fatal("This program must be run as root! (sudo)")
	}
	_file, err := ioutil.ReadFile("/home/bogdan/wisehands/domains.txt")
	if err != nil {
		fmt.Print(err)
	}
	//fmt.Printf(string(_domains))
	_domains := strings.Split(string(_file), "\n")
	//fmt.Println(_domains)
	for _, _domain := range _domains{
		retry_count := int(0)
		renew_certificate_for_domain(_domain, retry_count)
	}
	restart := []string{"lighttpd", "restart"}
	restartOutput := exec.Command("/sbin/service", restart...)
	stdoutStderr, err := restartOutput.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", stdoutStderr)
}
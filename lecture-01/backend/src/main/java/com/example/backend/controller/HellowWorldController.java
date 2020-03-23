package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class HellowWorldController {

    @GetMapping("/hello-world")
    public String helloWorld() {
        return "Hellow World";
    }

    // hello-world-bean
    @GetMapping("/hello-world-bean")
    public HelloWorldBean helloWorldBean() {
        return new HelloWorldBean("Hellow World");
    }

    @GetMapping("/hello-world-bean-variables/{name}")
    public HelloWorldBean helloWorldBeanVariable(@PathVariable String name) {
        return new HelloWorldBean(String.format("Hellow World %s", name));
    }
}

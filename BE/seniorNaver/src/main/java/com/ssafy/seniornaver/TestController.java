package com.ssafy.seniornaver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Hello this is test";
    }

    @GetMapping("/test2")
    public String test2() {
        return "Hello this is test";
    }
}
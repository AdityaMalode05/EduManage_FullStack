package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = "com.example.demo")
@EntityScan(basePackages = "com.example.demo.Model")
public class EdumanageBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EdumanageBackendApplication.class, args);
}

}



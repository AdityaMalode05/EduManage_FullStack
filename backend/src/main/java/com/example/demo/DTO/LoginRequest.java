package com.example.demo.DTO;

public class LoginRequest {
    private String email;
    private String password;
    private String role;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "LoginRequest [email=" + email + ", password=" + password + ", role=" + role + "]";
	}

    
}

package com.example.demo.DTO;

public class RecentActivityDTO {
    private String message;
    private String role;
    private int id;

    public RecentActivityDTO(String message, String role, int id) {
        this.message = message;
        this.role = role;
        this.id = id;
    }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

     
}
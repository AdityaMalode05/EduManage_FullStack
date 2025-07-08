package com.example.demo.DTO;


public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role;
    private int courseId;
    private int batchId;

   
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
  
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

    public int getCourseId() {
        return courseId;
    }
    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public int getBatchId() {
        return batchId;
    }
    public void setBatchId(int batchId) {
        this.batchId = batchId;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
               "name='" + name + '\'' +
               ", email='" + email + '\'' +
               ", password='" + password + '\'' +
               ", role='" + role + '\'' +
               ", courseId=" + courseId +
               ", batchId=" + batchId +
               '}';
    }
}

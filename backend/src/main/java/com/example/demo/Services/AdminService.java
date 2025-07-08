package com.example.demo.Services;

import java.util.List;

import com.example.demo.Model.Admin;

public interface AdminService {
	Admin save(Admin a);
    List<Admin> getAll();
    Admin getById(int id);
    void delete(int id);

}

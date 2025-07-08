package com.example.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.ManyToOne;

@Entity
public class Trainer {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    private String name;
	    private String email;
	    private String password;

	    @ManyToOne
	    @JoinColumn(name = "course_id")
	    private Course course;

	    @ManyToOne
	    @JoinColumn(name = "batch_id")
	    private Batch batch;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

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

		public Course getCourse() {
			return course;
		}

		public void setCourse(Course course) {
			this.course = course;
		}

		public Batch getBatch() {
			return batch;
		}

		public void setBatch(Batch batch) {
			this.batch = batch;
		}

//		@Override
//		public String toString() {
//			return "Trainer [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", course="
//					+ course + ", batch=" + batch + "]";
//		}
//	    
		
		@Override
		public String toString() {
		    return "Trainer [id=" + id + ", name=" + name + ", email=" + email + "]";
		}

	    
    
    

}

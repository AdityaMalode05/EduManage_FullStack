package com.example.demo.Model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
public class Task {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    private String title;
	    private String description;

	    @Temporal(TemporalType.DATE)
	    private Date dueDate;

	    @ManyToOne
	    @JoinColumn(name = "batch_id")
	    private Batch batch;
	    
	    @ManyToOne
	    @JoinColumn(name = "trainer_id")
	    private Trainer trainer;


		public Trainer getTrainer() {
			return trainer;
		}

		public void setTrainer(Trainer trainer) {
			this.trainer = trainer;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public Date getDueDate() {
			return dueDate;
		}

		public void setDueDate(Date dueDate) {
			this.dueDate = dueDate;
		}

		public Batch getBatch() {
			return batch;
		}

		public void setBatch(Batch batch) {
			this.batch = batch;
		}

	@Override
		public String toString() {
			return "Task [id=" + id + ", title=" + title + ", description=" + description + ", dueDate=" + dueDate
					+ ", batch=" + batch + ", trainer=" + trainer + "]";
		}
    
}

package com.ssafy.seniornaver.mz.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class SituationProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemId;

    @Column
    private String image;

    @Column(nullable = false)
    private LocalDateTime createAt;

    @Column(nullable = false)
    private LocalDateTime updateAt;

    @Column(nullable = false)
    private int answer;

    @Column(nullable = false)
    private String review;

    @Column(nullable = false)
    private String problem_explanation;

    @Column(nullable = false)
    private Integer useYear;

    @Builder
    public SituationProblem(String image, int answer, String review, String problem_explanation, Integer useYear) {
        this.image = image;
        this.answer = answer;
        this.review = review;
        this.problem_explanation = problem_explanation;
        this.useYear = useYear;
    }

    @PrePersist
    private void prePersist() {
        this.createAt = LocalDateTime.now().withNano(0);
    }

    public void updateProblem() {
        this.updateAt = LocalDateTime.now().withNano(0);
    }
}

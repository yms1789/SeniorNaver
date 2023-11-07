package com.ssafy.seniornaver.mz.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class SituationProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemId;

    @Column(nullable = false)
    private String title;

    @Column
    private String image;

    @Column(nullable = false)
    private LocalDateTime createAt;

    @Column
    private LocalDateTime updateAt;

    @Column(nullable = false)
    private int answer;

    @Column(nullable = false)
    private String review;

    @Column(nullable = false)
    private String problem_explanation;

    @Column(nullable = false)
    private Integer useYear;

    @Column(nullable = false)
    private String makeMember;

    @OneToMany(mappedBy = "vocaId", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private List<CompleteProblem> completeVocaList = new ArrayList<>();

    @OneToMany(mappedBy = "vocaId", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private List<SaveProblem> saveMember = new ArrayList<>();

    @Builder
    public SituationProblem(String title, String image, int answer, String review, String problem_explanation, Integer useYear) {
        this.title = title;
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

    public void updateProblem(String title, int answer, String review, String problem_explanation, int useYear) {
        this.title = title;
        this.answer = answer;
        this.review = review;
        this.problem_explanation = problem_explanation;
        this.useYear = useYear;
        this.updateAt = LocalDateTime.now().withNano(0);
    }
}

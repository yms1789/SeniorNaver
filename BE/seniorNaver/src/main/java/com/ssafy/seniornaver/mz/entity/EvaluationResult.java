package com.ssafy.seniornaver.mz.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class EvaluationResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn
    private VocabularyList vocaId;

    @Column
    private Long problemId;

    @Column
    private LocalDate createAt;

    @Column
    private int choice;

    @Column
    private boolean answer;

    @PrePersist
    public void prePersist() {
        this.createAt = LocalDate.now();
    }

    @Builder
    public EvaluationResult(VocabularyList vocabularyList, Long problemId, int choice, boolean answer) {
        this.vocaId = vocabularyList;
        this.problemId = problemId;
        this.choice = choice;
        this.answer = answer;
    }
}

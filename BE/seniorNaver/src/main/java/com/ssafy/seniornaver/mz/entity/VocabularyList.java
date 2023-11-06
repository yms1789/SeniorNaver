package com.ssafy.seniornaver.mz.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class VocabularyList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocaId;

    @Column(nullable = false)
    private Long memberId;

    @OneToMany(mappedBy = "scrapId", fetch = FetchType.LAZY)
    List<ScrapWord> scrapWords = new ArrayList<>();

    @OneToMany(mappedBy = "tagId", fetch = FetchType.LAZY)
    List<Tag> tags = new ArrayList<>();

    @OneToMany(mappedBy = "problemId", fetch = FetchType.LAZY)
    List<SituationProblem> completeProblems = new ArrayList<>();

    @OneToMany(mappedBy = "problemId", fetch = FetchType.LAZY)
    List<SituationProblem> makeProblems = new ArrayList<>();

    @Builder
    public VocabularyList(Long memberId) {
        this.memberId = memberId;
    }
}


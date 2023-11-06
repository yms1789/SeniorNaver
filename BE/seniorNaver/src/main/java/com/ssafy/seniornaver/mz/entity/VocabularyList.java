package com.ssafy.seniornaver.mz.entity;

import com.ssafy.seniornaver.auth.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@NoArgsConstructor
public class VocabularyList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long listId;

    @OneToOne
    @JoinColumn(nullable = false)
    private Member memberId;

    @OneToMany(mappedBy = "listId", fetch = FetchType.LAZY)
    List<ScrapWord> scrapWords = new ArrayList<>();

    @OneToMany(mappedBy = "listId", fetch = FetchType.LAZY)
    List<VocabularyList> vocabularyLists = new ArrayList<>();

    @Builder
    public VocabularyList(Member member) {
        this.memberId = member;
    }
}


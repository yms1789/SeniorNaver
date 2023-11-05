package com.ssafy.seniornaver.mz.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ScrapWord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scrapId;

    @ManyToOne
    @JoinColumn(nullable = false)
    private VocabularyList listId;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Directory wordId;
}

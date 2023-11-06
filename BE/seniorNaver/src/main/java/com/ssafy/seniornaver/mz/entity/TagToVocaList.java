package com.ssafy.seniornaver.mz.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class TagToVocaList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Tag tag;

    @ManyToOne
    @JoinColumn(nullable = false)
    private VocabularyList vocaId;

}

package com.ssafy.seniornaver.mz.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class TagToWord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Tag tagId;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Directory wordId;

    @Builder
    public TagToWord(Tag tagId, Directory wordId) {
        this.tagId = tagId;
        this.wordId = wordId;
    }
}

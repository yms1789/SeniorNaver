package com.ssafy.seniornaver.mz.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Directory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordId;

    @Column(nullable = false)
    private String word;

    @Column(nullable = false)
    private String mean;

    @Column(nullable = false)
    private String example;

    @Column(nullable = false)
    private Integer useYear;

    @Builder
    public Directory(String word, String mean, String example, Integer useYear) {
        this.word = word;
        this.mean = mean;
        this.example = example;
        this.useYear = useYear;
    }
}

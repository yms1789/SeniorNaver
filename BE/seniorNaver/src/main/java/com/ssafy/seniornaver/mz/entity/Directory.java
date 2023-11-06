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

    @Column(nullable = false)
    private LocalDateTime createAt;

    @Column(nullable = false)
    private LocalDateTime updateAt;

    @OneToMany
    private List<Tag> tags = new ArrayList<>();

    @OneToMany(mappedBy = "scrapId", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<ScrapWord> scrapWordList = new ArrayList<>();

    @PrePersist
    private void prePersist() {
        this.createAt = LocalDateTime.now().withNano(0);
    }

    @Builder
    public Directory(String word, String mean, String example, Integer useYear) {
        this.word = word;
        this.mean = mean;
        this.example = example;
        this.useYear = useYear;
    }

    public void updateDirectory(String mean, String example, Integer useYear) {
        this.mean = mean;
        this.example = example;
        this.useYear = useYear;
        this.updateAt = LocalDateTime.now().withNano(0);
    }
}

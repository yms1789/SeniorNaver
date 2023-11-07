package com.ssafy.seniornaver.mz.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class TagToProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Tag tagId;

    @ManyToOne
    @JoinColumn(nullable = false)
    private SituationProblem problemId;

}

package com.ssafy.seniornaver.mz.entity;

import com.ssafy.seniornaver.auth.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class VocabularyList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocaId;

    @OneToOne
    @JoinColumn(nullable = false)
    private Member memberId;

    @Builder
    public VocabularyList(Member member) {
        this.memberId = member;
    }
}

package com.ssafy.seniornaver.mz.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Tag {
    @Id
    @Column(nullable = false)
    private Long tagId;

    @Column(nullable = false)
    private String tag;

    @Builder
    public Tag(Long tagId, String tag) {
        this.tag = tag;
    }
}

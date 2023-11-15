package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.Dictionary;
import com.ssafy.seniornaver.mz.entity.Tag;
import com.ssafy.seniornaver.mz.entity.TagToWord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagToWordRepository extends JpaRepository<TagToWord, Long> {
    List<TagToWord> findAllByWordId(Dictionary wordId);
    @Query("SELECT DISTINCT ttw FROM TagToWord ttw " +
            "JOIN ttw.tagId tag " +
            "JOIN ttw.wordId word " +
            "WHERE tag.tag LIKE %:tagTitle% " +
            "AND word.useYear >= :year " +
            "AND word.useYear < :year + 10 " +
            "ORDER BY tag.tag ASC")
    List<TagToWord> findByTagIdAndWordYear(String tagTitle, int year, Pageable pageable);
    List<TagToWord> findAllByTagId(Tag tag);
}

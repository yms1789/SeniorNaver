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
    List<TagToWord> findAllByTagId(Tag tag);
}

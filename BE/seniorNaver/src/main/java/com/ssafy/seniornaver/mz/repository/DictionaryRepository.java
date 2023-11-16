package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.Dictionary;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
    Optional<Dictionary> findByWordId(Long wordId);
    Optional<Dictionary> findByWord(String word);
    List<Dictionary> findAllByWordContaining(String word, Pageable pageable);
    List<Dictionary> findAllByWordContaining(String word);
    boolean existsByWord(String word);

    @Query(value = "SELECT DISTINCT dict.* " +
    "FROM tag_to_word as ttw " +
    "JOIN dictionary as dict ON ttw.word_id_word_id = dict.word_id " +
    "JOIN tag on ttw.tag_id_tag_id = tag.tag_id " +
    "where tag.tag Like 'keyword' " +
    "and use_year >= year " +
    "and use_year < year+10", nativeQuery = true)
    List<Dictionary> findAllByTagTagLike(String keyword, int year, Pageable pageable);

    @Query(value = "SELECT DISTINCT dict.* " +
            "FROM tag_to_word as ttw " +
            "JOIN dictionary as dict ON ttw.word_id_word_id = dict.word_id " +
            "JOIN tag on ttw.tag_id_tag_id = tag.tag_id " +
            "where tag.tag Like 'keyword' " +
            "and use_year >= year " +
            "and use_year < year+10", nativeQuery = true)
    List<Dictionary> findAllByTagTagLike(String keyword, int year);

    @Query(value = "SELECT DISTINCT dict.* " +
            "FROM tag_to_word as ttw " +
            "JOIN dictionary as dict ON ttw.word_id_word_id = dict.word_id " +
            "JOIN tag on ttw.tag_id_tag_id = tag.tag_id " +
            "where tag.tag Like 'keyword'", nativeQuery = true)
    List<Dictionary> findAllByTagTagLike(String keyword, Pageable pageable);

    @Query(value = "SELECT DISTINCT dict.* " +
            "FROM tag_to_word as ttw " +
            "JOIN dictionary as dict ON ttw.word_id_word_id = dict.word_id " +
            "JOIN tag on ttw.tag_id_tag_id = tag.tag_id " +
            "where tag.tag Like 'keyword'", nativeQuery = true)
    List<Dictionary> findAllByTagTagLike(String keyword);

    List<Dictionary> findAllByUseYearBetween(int startYear, int endYear, Pageable pageable);
    List<Dictionary> findAllByUseYearBetween(int startYear, int endYear);

    @Query(value = "SELECT * FROM seniornaver.dictionary as sp order by RAND() limit 10", nativeQuery = true)
    List<Dictionary> findAll();
}

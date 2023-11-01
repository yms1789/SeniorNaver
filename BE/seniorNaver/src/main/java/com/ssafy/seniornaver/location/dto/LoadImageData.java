package com.ssafy.seniornaver.location.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class LoadImageData {

    private List<Item> items;

    @Getter
    public static class Item {
        private String thumbnail;
    }
}

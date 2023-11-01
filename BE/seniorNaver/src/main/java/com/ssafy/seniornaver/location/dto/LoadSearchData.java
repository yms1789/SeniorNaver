package com.ssafy.seniornaver.location.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class LoadSearchData {

    private List<Item> items;

    @Getter
    public static class Item {
        private String title;
        private String category;
        private String roadAddress;
        private StringBuffer mapx;
        private StringBuffer mapy;

        public void updateCategory(String category) {
            this.category = category;
        }
        public void updateTitle(String title) {
            this.title = title;
        }

    }
}

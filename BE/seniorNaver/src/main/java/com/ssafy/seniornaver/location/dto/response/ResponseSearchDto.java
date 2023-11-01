package com.ssafy.seniornaver.location.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ResponseSearchDto {

    private List<Item> items;

    @Getter
    public static class Item {
        private String category;
        private String thumbnail;
        private String shopName;
        private StringBuffer mapX;
        private StringBuffer mapY;
        private String shopLocation;

        @Builder
        public Item(String category, String thumbnail, String shopName, StringBuffer mapX, StringBuffer mapY, String shopLocation) {
            this.category = category;
            this.thumbnail = thumbnail;
            this.shopName = shopName;
            this.mapX = mapX;
            this.mapY = mapY;
            this.shopLocation = shopLocation;
        }

        public void setThumbnail(String thumbnail) {
            this.thumbnail = thumbnail;
        }
    }

    @Builder
    public ResponseSearchDto(List<Item> items) {
        this.items = items;
    }
}

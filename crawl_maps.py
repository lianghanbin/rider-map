"""
地图搜索爬虫 v3 —— 必应图片搜索（国内可用）
===========================================
用法： py -3.12 crawl_maps.py "艾尔登法环 全地图"
"""

import requests
import json
import sys
import re
import urllib.parse

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def search_bing_images(keyword, count=30):
    """必应图片搜索（国内 cn.bing.com）"""
    results = []
    url = f"https://cn.bing.com/images/search?q={urllib.parse.quote(keyword)}&first=1&count={count}"

    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        html = resp.text

        # 从 HTML 中提取图片 URL：查找 murl 属性
        # 必应把图片信息藏在 <a class="iusc"> 的 m 属性里
        pattern = r'"murl"\s*:\s*"([^"]+)"'
        matches = re.findall(pattern, html)

        # 也匹配 imgurl
        pattern2 = r'imgurl=([^&"]+)'
        matches2 = re.findall(pattern2, html)

        all_urls = list(set(matches + matches2))

        for i, img_url in enumerate(all_urls[:count]):
            # 简单过滤
            low = img_url.lower()
            if any(s in low for s in ['icon', 'avatar', 'logo', 'favicon']):
                continue
            if not any(low.endswith(ext) for ext in ['.jpg','.jpeg','.png','.webp','.gif']):
                continue

            results.append({
                "thumb": img_url.replace("/th?id=", "/th?id=OIP."),
                "full": img_url,
                "name": f"搜索结果 {i+1}",
                "width": 0,
                "height": 0
            })
    except Exception as e:
        print(f"搜索失败: {e}")

    return results


if __name__ == "__main__":
    keyword = sys.argv[1] if len(sys.argv) > 1 else "游戏地图"
    print(f"搜索: {keyword}")

    maps = search_bing_images(keyword, 30)
    print(f"找到 {len(maps)} 张候选图片")

    for i, m in enumerate(maps):
        print(f"  {i+1}. {m['full'][:60]}")

    with open("game-maps.json", "w", encoding="utf-8") as f:
        json.dump(maps, f, ensure_ascii=False, indent=2)
    print(f"\n已写入 game-maps.json ({len(maps)} 张)")

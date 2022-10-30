import { shallowMount } from "@vue/test-utils"
import { describe, expect, it, vi } from 'vitest'
import HelloWorld from "@/components/HelloWorld.vue"

const wrapper = shallowMount(HelloWorld, {
  props: {
    msg: "test Hello"
  }
});

describe("初期表示確認", () => {
  it("初期表示確認", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.text()).toContain("test Hello");
    expect(wrapper.text()).toContain("Select Foleder");
    expect(wrapper.text()).toContain("1min Timer");
  });
});

describe("タイマーの動作確認", () => {
  it("設定時間未経過", () => {
    window.alert = vi.fn();
    expect(window.alert).toHaveBeenCalledTimes(0);
    wrapper.vm.TimerAlarm(40)
    expect(window.alert).toHaveBeenCalledTimes(0);
  });
  it("設定時間経過", () => {
    window.alert = vi.fn();
    vi.useFakeTimers()
    wrapper.vm.TimerAlarm(40)
    expect(window.alert).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(40 * 1000)
    vi.useRealTimers()
    expect(window.alert).toHaveBeenCalledWith("output");
  });
});


describe("テーブル変換処理", () => {
  it.only("csv→テーブル", () => {
    const targets: string[] = ["ホールの直径平均", "ホールの最大", "ホールの最小", "ホールの深さ"];
    const targets: string[] = ["レイヤーの直径平均", "レイヤーの最大", "レイヤーの最小", "レイヤーの深さ"];
    const targets: string[] = ["ベースラインの直径平均", "ベースラインの深さ"];
    const csv: string[][] = [
      ["Name", "ホールの直径平均", "ホールの最大", "ホールの最小", "ホールの深さ", "レイヤーの直径平均", "レイヤーの最大", "レイヤーの最小", "レイヤーの深さ", "ベースラインの直径平均", "ベースラインの深さ"],
      ["ホール1", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109"],
      ["ホール2", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209"],
      ["ホール3", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309"]
    ];
    const names = searchByHeader(csv, "Name")
    names.forEach((name: string) => {
      console.log("name: ", name);
      targets.forEach((t: string): void => {
        console.log("target: ", t)
      });
    })
  });
});

const searchByHeader = (target: string[][], key: string): string[] => {
  const headerIndex = 0;
  const index: number = target[headerIndex].findIndex((t: string): boolean => t === key);
  const hits: string[] = [];
  target.forEach((t: string[]): void => {
    if (t[index] !== key) {
      hits.push(t[index])
    }
  });
  return hits;
}
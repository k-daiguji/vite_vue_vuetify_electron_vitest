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
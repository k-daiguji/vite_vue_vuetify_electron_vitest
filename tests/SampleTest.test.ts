import { shallowMount } from "@vue/test-utils"
import { describe, expect, it, vi } from 'vitest'
import App from "@/App.vue"

const wrapper = shallowMount(App, {
  props: {}
});

describe("mount", () => {
  it("shallowMount", () => {
    expect(wrapper).toBeDefined();
  });
});

describe("mocking", () => {
  it("vi.spyOn", () => {
    let i = 0
    setInterval(() => console.log(++i), 50)
    vi.useFakeTimers()
    vi.runOnlyPendingTimers()
    let apples = 0;
    const obj = {
      getApples: () => 13,
    }
    const spy = vi.spyOn(obj, 'getApples').mockImplementation(() => apples * 3);
    apples = 2;
    expect(obj.getApples()).toBe(6);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(6);
  });
  it("vi.fn", () => {
    const getApples = vi.fn(() => 0);
    getApples();
    expect(getApples).toHaveBeenCalled();
    expect(getApples).toHaveReturnedWith(0);

    getApples.mockReturnValueOnce(5);
    const res = getApples();
    expect(res).toBe(5);
    expect(getApples).toHaveNthReturnedWith(2, 5);

    const getOranges = vi.fn();
    getOranges();
    expect(getOranges).toHaveBeenCalled();
    expect(getOranges).toHaveReturnedWith(undefined);
  });
});
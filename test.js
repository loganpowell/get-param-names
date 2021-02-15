/*eslint no-console: "off"*/
/*eslint-disable max-len */

const getParamNames = require("./main.js")

const warned = (x = jest.fn()) => (jest.spyOn(console, "warn").mockImplementation(x), x)

describe("`getParamNames`:", () => {
    test("1: `function` ordinal parameters", () => {
        const _1 = function f0(self, meme, init) {}
        expect(getParamNames(_1)).toMatchObject([ "self", "meme", "init" ])
    })
    test("2: `function` ordinal w/default parameters", () => {
        const _2 = function f1(str = "hello", arr = [ "what's up" ]) {}
        expect(getParamNames(_2)).toMatchObject([ "str", "arr" ])
    })
    test("3: arrow fn: ordinal", () => {
        const _3 = (meme, param) => {}
        expect(getParamNames(_3)).toMatchObject([ "meme", "param" ])
    })
    test("4: async `function` with variety", () => {
        const _4 = async function f3(ids, { fetch = false, filter = user => user, arr = [] } = {}) {}
        expect(getParamNames(_4)).toMatchObject([ "ids", { fetch: false, filter: "user => user", arr: [] } ])
    })
    test("5: async `function` with nested variety", () => {
        const _5 = async function f4(
            {
                item1,
                item2 = {
                    prop1 : true,
                    prop2 : false,
                    prop3 : [ "array", "of", "strings" ]
                }
            } = {},
            [ item3, item4, [ item5, item6 ] ]
        ) {}
        expect(getParamNames(_5)).toMatchObject([
            { item2: { prop1: true, prop2: false, prop3: [ '"array"', '"of"', '"strings"' ] } },
            [ "item3", "item4", [ "item5", "item6" ] ]
        ])
    })

    test("6: single destructured `function` object", () => {
        const _6 = function({ d, e, s }) {}
        expect(getParamNames(_6)).toMatchObject([ { d: undefined, e: undefined, s: undefined } ])
    })
    test("7: single destructured arrow function object", () => {
        const _7 = ({ d, e, s }) => {}
        expect(getParamNames(_7)).toMatchObject([ "d", "e", "s" ])
    })
    test("3: one destructured arg and one positional (arrow)", () => {
        const _3 = ({ d, e, s }, x) => {}
        expect(getParamNames(_3)).toMatchObject([ "d", "e", "s", "x" ])
    })
    //test("4: two positional args", () => {
    //    const _4 = function(x, y) {}
    //    expect(getParamNames(_4)).toMatchObject([ "x", "y" ])
    //})
    //test("5: one destructured arg and one positional (`function`)", () => {
    //    const warn_spy = warned()
    //    const _5 = function({ d, e, s }, x) {}
    //    expect(getParamNames(_5)).toMatchObject([ "d", "e", "s", "x" ])
    //    expect(warn_spy.mock.calls.length).toBe(0)
    //})
    test("6: Computed Property and positional", () => {
        //const warn_spy = warned()
        const _6 = ({ ["a" + "b"]: c, d }, x) => {}
        const get = () => {
            try {
                return getParamNames(_6)
            } catch (e) {
                return "error"
            }
        }
        const res = get()
        expect(res).toBe("error")
        //expect(warn_spy.mock.calls.length).toBe(1)
    })
    //test("7: Computed Property with space", () => {
    //    const warn_spy = warned()
    //    const _7 = ({ [`comp `]: c, d }) => {}
    //    expect(getParamNames(_7)).toMatchObject([ "d" ])
    //    expect(warn_spy.mock.calls.length).toBe(1)
    //})
    //test("8: line breaks between destructured params", () => {
    //    // prettier-ignore
    //    const _8 = ({
    //        d,
    //        e,
    //        s
    //    }) => {}
    //    expect(getParamNames(_8)).toMatchObject([ "d", "e", "s" ])
    //})
    //test("9: destructured line breaks with inline comments", () => {
    //    // prettier-ignore
    //    const _9 = ({
    //        d, // with
    //        e, // inline
    //        s // comments
    //    }) => {}
    //    expect(getParamNames(_9)).toMatchObject([ "d", "e", "s" ])
    //})
    //test("10: positional line breaks with comments", () => {
    //    // prettier-ignore
    //    const _10 = (
    //        // with comment above
    //        d,
    //        e,
    //        s
    //    ) => {}
    //    expect(getParamNames(_10)).toMatchObject([ "d", "e", "s" ])
    //})
    //test("11: Computed properties &+ default values: total warnings = 1", () => {
    //    const warn_spy = warned()

    //    // prettier-ignore
    //    const _11 = ({
    //        // with comment above
    //        [`comp `]: c, // inline
    //        d,
    //        [`another` + "comp"]: w = "destructured",
    //        e
    //    }) => {}
    //    expect(getParamNames(_11)).toMatchObject([ "d", "e" ])
    //    expect(warn_spy.mock.calls.length).toBe(1)
    //})
    //test("12: Nested properties gets a warning", () => {
    //    const warn_spy = warned()

    //    // prettier-ignore
    //    const _11 = ({
    //        // with comment above
    //        c: {
    //            d // inline
    //        },
    //        e
    //    }) => {}
    //    expect(getParamNames(_11)).toMatchObject([ "d", "e" ])
    //    expect(warn_spy.mock.calls.length).toBe(1)
    //})
    //test("13: Single (default) parameter returns empty list", () => {
    //    const warn_spy = warned()
    //    // prettier-ignore
    //    expect(getParamNames((x) => x)).toMatchObject([])
    //    expect(getParamNames(x => x)).toMatchObject([])
    //    expect(warn_spy.mock.calls.length).toBe(0)
    //})
})

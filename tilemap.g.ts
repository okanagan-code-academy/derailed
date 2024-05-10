// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`200010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030101010101010100000000000000000000000000000000000401010101010102000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
2222222........22222222222222222
........222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
22222222222222222222222222222222
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile4,myTiles.tile7,myTiles.tile11], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "horizontalRail":
            case "tile1":return tile1;
            case "verticalRail":
            case "tile2":return tile2;
            case "upRail":
            case "tile4":return tile4;
            case "upRailAlternate":
            case "tile3":return tile3;
            case "downRail":
            case "tile5":return tile5;
            case "downRailAlternate":
            case "tile6":return tile6;
            case "rightRail":
            case "tile7":return tile7;
            case "rightRailAlternate":
            case "tile8":return tile8;
            case "leftRail":
            case "tile9":return tile9;
            case "leftRailAlternate":
            case "tile10":return tile10;
            case "spawnRail":
            case "tile11":return tile11;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.

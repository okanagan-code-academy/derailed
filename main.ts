namespace SpriteKind {
    export const Indicator = SpriteKind.create()
    export const Tile = SpriteKind.create()
    export const TrainCar = SpriteKind.create()
}
let playerSprite: Sprite = null
let indicatorSprite: Sprite = null
let railSprite: Sprite = null
let currentRailIndex: number = 0
let currentRailTypeIndex: number = 0
let currentTrainList: Sprite[] = []
let level: number = 0
let isValidTile: boolean = false

const enum TrainCarType {
    Locomotive,
    Freight,
    Caboose,
}
let trainCarObject = {
    "image": [
        img`
            ................................
            .bbbbbbbbbbbbbbbbbbbbbbbbbbbb...
            .bdddddddddddddddddddb1111111b..
            .bd88a98d88a98d88a98db8888a98b..
            .bd88a98188a98188a981b8888a98b..
            .bd88a98188a98188a981b8888a98b..
            .bd88a98d88a98d88a98dd88888a98b.
            .bd88a98d88a98d88a98bdb1111111b.
            .bdbdbdbdbdbdbdbdbdbdbb5111115b.
            .bbdbdbdbdbdbdbdbdbdbbb5111115b.
            .bbbbbbbbbbbbbbbbbbbbbbdddddddb.
            .eeeeeeeeeeeeeeeeeeebbdddddddb..
            .ccccccccccccccccccccccccccccc..
            .cffcffceeeeeeecffcffceeeeeecc..
            ................................
            ................................
        `,
        img`
        ................................
        .bbbbbbbbbbbbbbbbbbbbbbbbbbbbb..
        .bdddddddddddddddddddb1111111b..
        .bd88a98d88a98d88a98db1111111b..
        .bd88a98188a98188a981b1111111b..
        .bd88a98188a98188a981b1111111b..
        .bd88a98d88a98d88a98db1111111b..
        .bd88a98d88a98d88a98bb1111111b..
        .bdbdbdbdbdbdbdbdbdbdb1111111b..
        .bbdbdbdbdbdbdbdbdbdbb1111111b..
        .bbbbbbbbbbbbbbbbbbbbbdddddddb..
        .eeeeeeeeeeeeeeeeeeebbdddddddb..
        .ccccccccccccccccccccccccccccc..
        .cffcffceeeeeeecffcffceeeeeecc..
        ................................
        ................................
    `,
        img`
        ................................
        .bbbbbbbbbbbbbbbbbbbbbbbbbbbbb..
        .b1111111111111111111b1111111b..
        .b1111111111111111111b1111111b..
        .b1111111111111111111b1111111b..
        .b1111111111111111111b1111111b..
        .b1111111111111111111b1111111b..
        .b1111111111111111111b1111111b..
        .bdbdbdbdbdbdbdbdbdbdb1111111b..
        .bbdbdbdbdbdbdbdbdbdbb1111111b..
        .bbbbbbbbbbbbbbbbbbbbbdddddddb..
        .eeeeeeeeeeeeeeeeeeebbdddddddb..
        .ccccccccccccccccccccccccccccc..
        .cffcffceeeeeeecffcffceeeeeecc..
        ................................
        ................................
    `,
    ],
    "type": [
        TrainCarType.Locomotive,
        TrainCarType.Freight,
        TrainCarType.Caboose
    ]
}
let tilemaps: tiles.TileMapData[] = [
    tilemap`level1`,
]
let railTypeList: Image[][] = [
    [assets.tile`horizontalRail`],
    [assets.tile`verticalRail`],
    [assets.tile`rightRail`, assets.tile`rightRailAlternate`],
    [assets.tile`leftRail`, assets.tile`leftRailAlternate`],
    [assets.tile`upRail`, assets.tile`upRailAlternate`],
    [assets.tile`downRail`, assets.tile`downRailAlternate`],
]

function selectLevel() {
    if (level < 0 || level >= tilemaps.length)
        return
    tiles.setTilemap(tilemaps[level])
    tiles.placeOnTile(playerSprite, tiles.getTileLocation(1, 1))
}


// Creating Sprites and Animations
function createPlayerAnimation() {
    characterAnimations.loopFrames(
        playerSprite, [
        img`
        . . . . f f f f . . . . . 
        . . f f c c c c f f . . . 
        . f f c c c c c c f f . . 
        f f c c c c c c c c f f . 
        f f c c f c c c c c c f . 
        f f f f f c c c f c c f . 
        f f f f c c c f c c f f . 
        f f f f f f f f f f f f . 
        f f f f f f f f f f f f . 
        . f f f f f f f f f f . . 
        . f f f f f f f f f f . . 
        f e f f f f f f f f e f . 
        e 4 f 7 7 7 7 7 7 c 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `,
        img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f c c c c f f . . 
        . f f f c c c c c c f f . 
        f f c c c c c c c c c f f 
        f c c c c f c c c c c c f 
        . f f f f c c c c f c c f 
        . f f f f c c f c c c f f 
        . f f f f f f f f f f f f 
        . f f f f f f f f f f f f 
        . . f f f f f f f f f f . 
        . . e f f f f f f f f f . 
        . . e f f f f f f f f e f 
        . . 4 c 7 7 7 7 7 e 4 4 e 
        . . e f f f f f f f e e . 
        . . . f f f . . . . . . . 
        `,
        img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f c c c c f f . . 
        . . f f c c c c c c f f . 
        . f f f c c c c c c c f f 
        f f f c c c c c c c c c f 
        f f c c c f c c c c c c f 
        . f f f f f c c c f c f f 
        . f f f f c c f f c f f f 
        . . f f f f f f f f f f f 
        . . f f f f f f f f f f . 
        . . f f f f f f f f f e . 
        . f e f f f f f f f f e . 
        . e 4 4 e 7 7 7 7 7 c 4 . 
        . . e e f f f f f f f e . 
        . . . . . . . . f f f . . 
        `],
        100,
        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
        playerSprite, [
        img`
        . . . . . . . . . . . . . 
        . . . f f f f f f . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f f . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f f . 
        f f e 4 e 1 f 4 4 f f . . 
        . f f f e 4 4 4 4 f . . . 
        . 4 4 4 e e e e f f . . . 
        . e 4 4 e 7 7 7 7 f . . . 
        . f e e f 6 6 6 6 f f . . 
        . f f f f f f f f f f . . 
        . . f f . . . f f f . . . 
        `,
        img`
        . . . . . . . . . . . . . 
        . . . f f f f f f . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f f . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f . . 
        . f e 4 e 1 f 4 4 f f . . 
        . f f f e e 4 4 4 f . . . 
        . . f e 4 4 e e f f . . . 
        . . f e 4 4 e 7 7 f . . . 
        . f f f e e f 6 6 f f . . 
        . f f f f f f f f f f . . 
        . . f f . . . f f f . . . 
        `,
        img`
        . . . f f f f f . . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f . . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f . . 
        . f e 4 e 1 f 4 4 f . . . 
        . f f f e 4 4 4 4 f . . . 
        . . f e e e e e f f . . . 
        . . e 4 4 e 7 7 7 f . . . 
        . . e 4 4 e 7 7 7 f . . . 
        . . f e e f 6 6 6 f . . . 
        . . . f f f f f f . . . . 
        . . . . f f f . . . . . . 
        `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
        playerSprite, [
        img`
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f f f c c f f f c . 
        f f f c f f f f f f f c . 
        c c c f f f e e f f c c . 
        f f f f f e e f f c c f . 
        f f f b f e e f b f f f . 
        . f 4 1 f 4 4 f 1 4 f . . 
        . f e 4 4 4 4 4 4 e f . . 
        . f f f e e e e f f f . . 
        f e f b 7 7 7 7 b f e f . 
        e 4 f 7 7 7 7 7 7 f 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `,
        img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f f f f f f f . . 
        . . f f f f f f c f f f . 
        f f f f f f f c c f f f c 
        f f f f c f f f f f f f c 
        . c c c f f f e e f f c c 
        . f f f f f e e f f c c f 
        . f f f b f e e f b f f f 
        . f f 4 1 f 4 4 f 1 4 f f 
        . . f e 4 4 4 4 4 e e f e 
        . f e f b 7 7 7 e 4 4 4 e 
        . e 4 f 7 7 7 7 e 4 4 e . 
        . . . f 6 6 6 6 6 e e . . 
        . . . f f f f f f f . . . 
        . . . f f f . . . . . . . 
        `,
        img`
        . . . . . . . . . . . . . 
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f c f f f f f f . . 
        c f f f c c f f f f f f f 
        c f f f f f f f c f f f f 
        c c f f e e f f f c c c . 
        f c c f f e e f f f f f . 
        f f f b f e e f b f f f . 
        f f 4 1 f 4 4 f 1 4 f f . 
        e f e e 4 4 4 4 4 e f . . 
        e 4 4 4 e 7 7 7 b f e f . 
        . e 4 4 e 7 7 7 7 f 4 e . 
        . . e e 6 6 6 6 6 f . . . 
        . . . f f f f f f f . . . 
        . . . . . . . f f f . . . 
        `],
        100,
        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
        playerSprite, [
        img`
        . . . . . f f f f f . . . 
        . . . f f f f f f f f f . 
        . . f f f c f f f f f f . 
        . . f f c f f f c f f f f 
        f f c c f f f c c f f c f 
        f f f f f e f f f f c c f 
        . f f f e e f f f f f f f 
        . . f f e e f b f e e f f 
        . . . f 4 4 f 1 e 4 e f . 
        . . . f 4 4 4 4 e f f f . 
        . . . f f e e e e e f . . 
        . . . f 7 7 7 e 4 4 e . . 
        . . . f 7 7 7 e 4 4 e . . 
        . . . f 6 6 6 f e e f . . 
        . . . . f f f f f f . . . 
        . . . . . . f f f . . . . 
        `,
        img`
        . . . . . . . . . . . . . 
        . . . . f f f f f f . . . 
        . . . f f f f f f f f f . 
        . . f f f c f f f f f f . 
        . f f f c f f f c f f f f 
        f f c c f f f c c f f c f 
        f f f f f e f f f f c c f 
        . f f f e e f f f f f f f 
        . . f f e e f b f e e f f 
        . . f f 4 4 f 1 e 4 e f . 
        . . . f 4 4 4 e e f f f . 
        . . . f f e e 4 4 e f . . 
        . . . f 7 7 e 4 4 e f . . 
        . . f f 6 6 f e e f f f . 
        . . f f f f f f f f f f . 
        . . . f f f . . . f f . . 
        `,
        img`
        . . . . . . . . . . . . . 
        . . . . f f f f f f . . . 
        . . . f f f f f f f f f . 
        . . f f f c f f f f f f . 
        . f f f c f f f c f f f f 
        f f c c f f f c c f f c f 
        f f f f f e f f f f c c f 
        . f f f e e f f f f f f f 
        . f f f e e f b f e e f f 
        . . f f 4 4 f 1 e 4 e f f 
        . . . f 4 4 4 4 e f f f . 
        . . . f f e e e e 4 4 4 . 
        . . . f 7 7 7 7 e 4 4 e . 
        . . f f 6 6 6 6 f e e f . 
        . . f f f f f f f f f f . 
        . . . f f f . . . f f . . 
        `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft)
    )
}
function createPlayer() {
    playerSprite = sprites.create(img`
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f f f c c f f f c . 
        f f f c f f f f f f f c . 
        c c c f f f e e f f c c . 
        f f f f f e e f f c c f . 
        f f f b f e e f b f f f . 
        . f 4 1 f 4 4 f 1 4 f . . 
        . f e 4 4 4 4 4 4 e f . . 
        . f f f e e e e f f f . . 
        f e f b 7 7 7 7 b f e f . 
        e 4 f 7 7 7 7 7 7 f 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(playerSprite)
    playerSprite.setFlag(SpriteFlag.StayInScreen, true)
    playerSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
    scene.cameraFollowSprite(playerSprite)
    createPlayerAnimation()
}
function createIndicatorSprite() {
    indicatorSprite = sprites.create(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
    `, SpriteKind.Indicator)
    indicatorSprite.z = 100
    setIndicatorSprite()
}
function setIndicatorSprite() {
    if (!isValidTile) {
        indicatorSprite.setImage(img`
            22222222222222222222
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            2..................2
            22222222222222222222
        `)
        return
    }
    indicatorSprite.setImage(img`
           33333333333333333333
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           3..................3
           33333333333333333333
       `)

}
function createRailSprite() {
    railSprite = sprites.create(railTypeList[currentRailTypeIndex][currentRailIndex], SpriteKind.Tile)
    railSprite.z = 2
}
function setRailSpriteImage() {
    if (!isValidTile) {
        railSprite.setImage(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
    }
    railSprite.setImage(railTypeList[currentRailTypeIndex][currentRailIndex])
}
function generateTrain() {
    createTrainCar(0)
    createTrainCar(1)
    createTrainCar(2)
    linkTrainCars()
}
function linkTrainCars() {
    let leadingCar: Sprite = null
    for (let trainCar of currentTrainList) {
        sprites.setDataSprite(trainCar, "leadingCar", leadingCar)
        leadingCar = trainCar
        tiles.placeOnTile(trainCar, tiles.getTilesByType(assets.tile`spawnRail`)[0])
    }
}
function createTrainCar(trainType: number) {
    if (trainType < 0 || trainType >= trainCarObject["image"].length) {
        console.log("Invalid traing type")
        return
    }
    if (currentTrainList.length == 0 && trainType != 0) {
        console.log("The first train car must be a locomotive!")
        return
    }
    let hasLocomotive: boolean = false
    for (let train of currentTrainList) {
        if (sprites.readDataString(train, "type") == TrainCarType.Locomotive.toString()) {
            hasLocomotive = true
            break
        }
    }
    if (trainType == 0 && hasLocomotive) {
        console.log("Can not create more than one locomotive")
        return
    }
    let trainCarSprite = sprites.create(trainCarObject["image"][trainType], SpriteKind.TrainCar)
    sprites.setDataString(trainCarSprite, "type", trainCarObject["type"][trainType].toString())
    sprites.setDataSprite(trainCarSprite, "leadingCar", null)
    currentTrainList.push(trainCarSprite)

}

// Checking a valid tile location
function validTileCheck() {
    isValidTile = true
    if (!(tiles.tileAtLocationIsWall(indicatorSprite.tilemapLocation()))) {
        isValidTile = false
    }
    setIndicatorSprite()
}


// Controller Events
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!isValidTile) {
        createTextSprite(playerSprite.x, playerSprite.y - 12, "invalid tile", 2, 0, 0, 1, 0, 400)
        return
    }
    tiles.setTileAt(indicatorSprite.tilemapLocation(), railSprite.image)
    tiles.setWallAt(indicatorSprite.tilemapLocation(), false)
})
controller.player2.up.onEvent(ControllerButtonEvent.Pressed, function () {
    currentRailIndex += 1
    currentRailIndex = currentRailIndex % railTypeList[currentRailTypeIndex].length
    setRailSpriteImage()
})
controller.player2.down.onEvent(ControllerButtonEvent.Pressed, function () {
    currentRailIndex -= 1
    if (currentRailIndex < 0)
        currentRailIndex += railTypeList[currentRailTypeIndex].length
    setRailSpriteImage()
})
controller.player2.right.onEvent(ControllerButtonEvent.Pressed, function () {
    currentRailTypeIndex += 1
    currentRailTypeIndex = currentRailTypeIndex % railTypeList.length
    setRailSpriteImage()
})
controller.player2.left.onEvent(ControllerButtonEvent.Pressed, function () {
    currentRailTypeIndex -= 1
    if (currentRailTypeIndex < 0)
        currentRailTypeIndex += railTypeList.length
    setRailSpriteImage()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(tiles.tileAtLocationIsWall(indicatorSprite.tilemapLocation()))) {
        tiles.setTileAt(indicatorSprite.tilemapLocation(), img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
        tiles.setWallAt(indicatorSprite.tilemapLocation(), true)
    }
})

// Ui and VFX functions
function createTextSprite(targetPositionX: number, targetPositionY: number, text: string, color: number, velocityX: number, velocityY: number, scale: number, accelerationY: number, lifespan: number) {
    let textSprite = textsprite.create(text)
    textSprite.setPosition(targetPositionX, targetPositionY)
    textSprite.setOutline(1, color)
    textSprite.setVelocity(velocityX, velocityY)
    textSprite.scale = scale
    textSprite.z = 1000
    textSprite.ay = accelerationY
    textSprite.lifespan = lifespan
}


// On start
createPlayer()
createIndicatorSprite()
createRailSprite()
selectLevel()
generateTrain()
console.logValue("Train Length", currentTrainList.length)

// Main Game-loop
game.onUpdate(function () {
    for (let sprite of sprites.allOfKind(SpriteKind.Indicator)) {
        let rowOffset: number = 0
        let colOffset: number = 0
        if (characterAnimations.matchesRule(playerSprite, characterAnimations.rule(Predicate.FacingUp))) {
            rowOffset = -1
        } else if (characterAnimations.matchesRule(playerSprite, characterAnimations.rule(Predicate.FacingRight))) {
            colOffset = 1
        } else if (characterAnimations.matchesRule(playerSprite, characterAnimations.rule(Predicate.FacingDown))) {
            rowOffset = 1
        } else {
            colOffset = -1
        }
        tiles.placeOnTile(sprite, tiles.getTileLocation(playerSprite.tilemapLocation().column + colOffset, playerSprite.tilemapLocation().row + rowOffset))
        validTileCheck()
        railSprite.setPosition(sprite.x, sprite.y)
        // playerSprite.sayText(isValidTile)
    }
})



scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    startnextlevel()
})
function startnextlevel () {
    currentlevel += 1
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    if (currentlevel == 1) {
        tiles.setTilemap(tilemap`level01`)
    } else if (currentlevel == 2) {
        tiles.setTilemap(tilemap`platformer12`)
    } else if (currentlevel == 3) {
        tiles.setTilemap(tilemap`platformer11`)
    } else if (currentlevel == 4) {
        tiles.setTilemap(tilemap`platformer10`)
    } else if (currentlevel == 5) {
        tiles.setTilemap(tilemap`level7`)
    } else if (currentlevel == 6) {
        tiles.setTilemap(tilemap`level8`)
    } else if (currentlevel == 7) {
        tiles.setTilemap(tilemap`platformer10`)
    } else if (currentlevel == 8) {
        tiles.setTilemap(tilemap`level9`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(player1, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        my_enemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 . . . . . . 
            . . . . 2 2 f f f f 2 2 2 2 . . 
            . . . . 2 f f f f f 1 1 1 f 2 2 
            . . . 2 2 f f f f f 1 1 1 f f 2 
            . . 2 2 f f f f f f f f f f 2 2 
            . . 2 f f f f f f f f f f f 2 . 
            . . . 2 2 f f f 2 2 2 2 2 2 2 . 
            . . . . 2 2 2 2 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(my_enemy, value)
        my_enemy.follow(player1, 30)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player1.vy = -250
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (true) {
        player1.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let my_enemy: Sprite = null
let player1: Sprite = null
let currentlevel = 0
currentlevel = 0
scene.setBackgroundColor(9)
player1 = sprites.create(img`
    . . . . . . . 5 5 5 5 5 . . . . 
    . . . . . . 5 5 7 f 7 5 5 . . . 
    . . . . . . 5 7 7 7 7 7 5 . . . 
    . . . . . . 5 7 f 7 f 7 5 . . . 
    . . . . . 5 5 7 7 7 7 7 5 . . . 
    . . . . . 5 5 7 7 7 7 7 5 . . . 
    . . . . . 5 7 7 7 7 7 5 5 . . . 
    . . . . . 5 5 5 5 5 5 5 . . . . 
    . . . . . 2 2 8 7 7 7 2 2 . . . 
    . . . . 2 2 . 8 7 7 7 8 2 2 . . 
    . . . 2 2 . 8 8 7 7 7 8 . 2 . . 
    . . 2 . . . 8 7 7 7 8 . . 2 . . 
    . . 2 . . . . 8 8 8 . . . 2 2 . 
    . . . . . . 2 2 . . 2 . . . . . 
    . . . . . . 2 . . . . 2 . . . . 
    . . . . . . 2 . . . . 2 . . . . 
    `, SpriteKind.Player)
controller.moveSprite(player1, 100, 0)
player1.ay = 500
scene.cameraFollowSprite(player1)
info.setLife(3)
startnextlevel()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
            } else if (value.vx > 0 && value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            value.vy = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vy = -30
        }
    }
})

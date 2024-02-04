import pygame as pg
import sys
import random

WIDTH = 900
HEIGHT = 600
SIZE = (WIDTH, HEIGHT)
FPS = 60

WHITE = (255, 255, 255)
BLUE = (0, 153, 255)
RED = (200, 0, 0)
GREEN = (0, 140, 0)
ORANGE = (255, 140, 0)
GRAY = (142, 142, 142)
LIGHTRED = (255, 100, 100)

pg.init()
score = 0
surface = pg.display.set_mode(SIZE)
clock = pg.time.Clock()
run = True

font = pg.font.SysFont("Arial", 32)
def display_text(text):
    text_img = font.render(text, True, (0,0,0))
    surface.blit(text_img, (10, 10))

class Grass:
    def __init__(self):
        self.x = 150
        self.y = 0
        self.w = WIDTH-300
        self.h = HEIGHT
    def draw_grass(self):
        pg.draw.rect(surface, GREEN, [self.x, self.y, self.w, self.h])

class Player:
    def __init__(self):
        self.dimensions = 30
        self.v = 10
        self.carries = []
        self.rect = pg.Rect(100, (HEIGHT + self.dimensions)/2, self.dimensions, self.dimensions)

    def draw_player(self):
        pg.draw.rect(surface, RED, self.rect)

# saueobjektene, hinderobjektene og spøkelsesobjektene arver fra denne.
class Objects:
    def __init__(self, x, y):
        self.rect = pg.Rect(x, y, player.dimensions, player.dimensions)

    def draw_object(self):
        pg.draw.rect(surface, RED, self.rect)

class Sheep(Objects):
    def __init__(self, x, y):
        super().__init__(x, y)

    def draw_object(self):
        #super().draw_object()
        pg.draw.rect(surface, WHITE, self.rect)

    def gets_carried(self):
        self.rect.x= player.rect.x
        self.rect.y = player.rect.y

class Obstacle(Objects):
    def __init__(self, x, y):
        super().__init__(x, y)

    def draw_object(self):
        #super().draw_object()
        pg.draw.rect(surface, ORANGE, self.rect)

class Ghost(Objects):
    def __init__(self, x, y):
        super().__init__(x, y)
        speed = random.randint(1, 2)
        self.vx = speed
        self.vy = 3 -speed

    def draw_object(self):
        #super().draw_object()
        pg.draw.rect(surface, BLUE, self.rect)



grass = Grass()
player = Player()
sheep_li = []
obstacle_li = []
ghost_li = [Ghost(random.randint(150, WIDTH-300), random.randint(0, HEIGHT-player.dimensions))]


# funksjon som lager et objekt et tilfeldig sted og sjekker om objektet er oppå et annet, hvis det er det lager den objektet på nytt et annet tilfeldig sted. Denne funksjonen brukes til å lage både sauer og hindere
def generate_object(Object, placement, object_li):
    object = Object(random.randint(placement[0], placement[1]), random.randint(0, HEIGHT-player.dimensions))
    while any(object.rect.colliderect(existing_object.rect) for existing_object in object_li):
        object = Object(random.randint(placement[0], placement[1]), random.randint(0, HEIGHT-player.dimensions))
    object_li.append(object)
    return object

for i in range (3):
    generate_object(Obstacle,[150, WIDTH-300], obstacle_li).draw_object()
    generate_object(Sheep, [WIDTH - 150, WIDTH - player.dimensions], sheep_li).draw_object()


while run:
    # Sørger for at løkken kjører i korrekt hastighet
    clock.tick(FPS)
    keys = pg.key.get_pressed()
    surface.fill(GRAY)
    grass.draw_grass()
    player.draw_player()

    # beveger på spøkelset og sjekker om det kolliderer med spilleren
    for ghost in ghost_li:
        ghost.rect.x += ghost.vx
        ghost.rect.y += ghost.vy
        if ghost.rect.x < 150 or ghost.rect.x > WIDTH-150-player.dimensions:
            ghost.vx *= -1
        if ghost.rect.y < 0 or ghost.rect.y > HEIGHT-player.dimensions:
            ghost.vy *= -1
        if player.rect.colliderect(ghost):
            run = False
        ghost.draw_object()

    # tegner inn sauene og hinderne
    for i in range(len(sheep_li)):
        sheep_li[i].draw_object()
    for i in range(len(obstacle_li)):
        obstacle_li[i].draw_object()


    for sheep in sheep_li:
        if player.rect.colliderect(sheep):
            sheep.gets_carried()
            #sjekker hvor mange sauer spilleren bærer
            if sheep not in player.carries:
                player.carries.append(sheep)
                if len(player.carries) > 1:
                    run = False
            player.v = 5
            # alt som gjøres når man får en sau over på andre siden
            if sheep.rect.x < 150-player.dimensions:
                score += 1
                sheep_li.remove(sheep)
                generate_object(Obstacle, [150, WIDTH - 300], obstacle_li).draw_object()
                generate_object(Sheep, [WIDTH - 150, WIDTH - player.dimensions], sheep_li).draw_object()
                player.carries = []
                ghost_li.append(Ghost(random.randint(150, WIDTH-300), random.randint(0, HEIGHT-player.dimensions)))
                player.v = 10


    if (keys[pg.K_LEFT] or keys[pg.K_a]) and player.rect.x > 0:
        #lager et spøkelses-objekt og som ligger rett foran spilleren som skal sjekke om det er noen hindringer i veien, hvis det ikke er det får spilleren flytte på seg
        new_rect = player.rect.copy()
        new_rect.x -= player.v
        if not any(new_rect.colliderect(obstacle.rect) for obstacle in obstacle_li):
            player.rect.x -= player.v

    if (keys[pg.K_RIGHT] or keys[pg.K_d]) and player.rect.x < WIDTH-player.dimensions:
        new_rect = player.rect.copy()
        new_rect.x += player.v
        if not any(new_rect.colliderect(obstacle.rect) for obstacle in obstacle_li):
            player.rect.x += player.v

    if (keys[pg.K_UP] or keys[pg.K_w]) and player.rect.y > 0:
        new_rect = player.rect.copy()
        new_rect.y -= player.v
        if not any(new_rect.colliderect(obstacle.rect) for obstacle in obstacle_li):
            player.rect.y -= player.v

    if (keys[pg.K_DOWN] or keys[pg.K_s]) and player.rect.y < HEIGHT-player.dimensions:
        new_rect = player.rect.copy()
        new_rect.y += player.v
        if not any(new_rect.colliderect(obstacle.rect) for obstacle in obstacle_li):
            player.rect.y += player.v

    # Går gjennom hendelser
    for event in pg.event.get():
        if event.type == pg.QUIT:
            run = False

    display_text(f"Poeng: {score}")
    pg.display.flip()

print(f"Du fikk {score} poeng")

pg.quit()
sys.exit()
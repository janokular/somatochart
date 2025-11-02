class Athlete:
    def __init__(self, x: float, y: float, name: str, color: str):
        self.x = x
        self.y = y
        self.name = name
        self.color = color

    def to_dict(self):
        return {'x': self.x, 'y': self.y, 'name': self.name, 'color': self.color}

class Athlete:
    def __init__(self,
                 endo: float,
                 meso: float,
                 ecto: float,
                 name: str,
                 color: str,
                 symbol: str):
        self.endo = endo
        self.meso = meso
        self.ecto = ecto
        self.name = name
        self.color = color
        self.symbol = symbol

    @property
    def x(self):
        return round(self.ecto - self.endo, 2)

    @property
    def y(self):
        return round(2 * self.meso - (self.endo + self.ecto), 2)

    def to_dict(self):
        return {
            'endo': self.endo,
            'meso': self.meso,
            'ecto': self.ecto,
            'x': self.x,
            'y': self.y,
            'name': self.name,
            'color': self.color,
            'symbol': self.symbol
        }

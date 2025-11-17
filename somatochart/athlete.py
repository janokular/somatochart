class Athlete:
    def __init__(self,
                 name: str,
                 endo: float,
                 meso: float,
                 ecto: float,
                 color: str,
                 symbol: str,
                 isVisible: bool):
        self.name = name
        self.endo = endo
        self.meso = meso
        self.ecto = ecto
        self.color = color
        self.symbol = symbol
        self.isVisible = isVisible

    @property
    def x(self):
        return round(self.ecto - self.endo, 2)

    @property
    def y(self):
        return round(2 * self.meso - (self.endo + self.ecto), 2)

    def to_dict(self):
        return {
            'name': self.name,
            'endo': self.endo,
            'meso': self.meso,
            'ecto': self.ecto,
            'x': self.x,
            'y': self.y,
            'color': self.color,
            'symbol': self.symbol,
            'isVisible': self.isVisible
        }

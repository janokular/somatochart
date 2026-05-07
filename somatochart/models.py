from dataclasses import dataclass


@dataclass
class Athlete:
    name: str
    endo: float
    meso: float
    ecto: float
    color: str
    symbol: str
    visible: bool

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
            'visible': self.visible
        }

class Athlete:
    def __init__(self,
                 endo: float,
                 meso: float,
                 ecto: float,
                 name: str,
                 color: str):
        self.endo = endo
        self.meso = meso
        self.ecto = ecto
        self.name = name
        self.color = color

    @property
    def x(self):
        return self.ecto - self.endo
    
    @property
    def y(self):
        return 2 * self.meso - (self.endo + self.ecto)

    def to_dict(self):
        return {
            'endo': self.endo,
            'meso': self.meso,
            'ecto': self.ecto,
            'x': self.x,
            'y': self.y,
            'name': self.name,
            'color': self.color
        }

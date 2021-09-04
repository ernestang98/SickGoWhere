import pandas as pd
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

clean = "Clinics & Polyclinics"

df1 = pd.read_csv(dir_path + '/archive/' + clean + "UncleanGeo.csv")
df1 = df1.iloc[::1]
df1.to_csv(dir_path + '/archive/' + clean + "Geo.csv", index=False, na_rep='N/A')
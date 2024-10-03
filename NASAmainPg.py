print("Get Satellit Surface Reflectance Data")
option = str(input("Location Name or Location Coordinates = "))
if option == "location name":
    import NASAplaceDisplay
else:
    import NASAcoordinateDisplay

print("thank you for using")
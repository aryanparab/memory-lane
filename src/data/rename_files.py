import os

def rename_images_to_numbers(folder_path):
    print(folder_path)
    allowed_exts = {'.jpg', '.png', '.heic'}
    
    files = [
        f for f in os.listdir(folder_path)
        if os.path.isfile(os.path.join(folder_path, f)) and os.path.splitext(f)[1].lower() in allowed_exts
    ]
    
    files.sort()  # Optional: sort alphabetically

    for i, filename in enumerate(files, start=1):
        ext = os.path.splitext(filename)[1]
        new_name = f"{i}{ext}"
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_name)
        os.rename(old_path, new_path)
        print(f"Renamed '{filename}' to '{new_name}'")

# Example usage:
rename_images_to_numbers(os.getcwd()+"/src/data")
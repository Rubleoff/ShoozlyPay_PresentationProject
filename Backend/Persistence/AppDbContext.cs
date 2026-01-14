
using Microsoft.EntityFrameworkCore;
using Domain.Models;

namespace Persistence;

public class ELearningDbContext(DbContextOptions options) 
    : DbContext(options)
{
    
    public DbSet<Category> Categories { get; set; }


    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     modelBuilder.ApplyConfiguration(new CategoryConfiguration());
    //     modelBuilder.ApplyConfiguration(new CourseConfiguration());
    //     modelBuilder.ApplyConfiguration(new LessonConfiguration());
    //     modelBuilder.ApplyConfiguration(new UserConfiguration());
    //     
    //     base.OnModelCreating(modelBuilder);
    // }
}
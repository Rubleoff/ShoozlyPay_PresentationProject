using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces;

public interface IAppDbContext
{
    DbSet<Category> Categories { get; set; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}